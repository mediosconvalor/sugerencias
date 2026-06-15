// ============================================
// GOOGLE APPS SCRIPT - Sugerencias MCV
// Backend simple y funcional
// ============================================

const SPREADSHEET_ID = '1yAt53Rhe0uZuJRtvk0bIgD5Ay0NigQbrxBF0PZw2M6M';

const SHEETS_CONFIG = {
  'Q&A and Blogs': {
    label: 'Q&A and Blogs',
    sheetName: 'Q&A and Blogs',
    columns: [
      'fecha',
      'sucursal',
      'sugerenciaDe',
      'publicoEspecifico',
      'preguntaComun',
      'respuesta'
    ],
    validations: {
      sucursal: 'B2',
      sugerenciaDe: 'C2'
    }
  },

  'App': {
    label: 'App',
    sheetName: 'App',
    columns: [
      'fecha',
      'sucursal',
      'sugeridoPor',
      'comentario'
    ],
    validations: {
      sucursal: 'B2',
      sugeridoPor: 'C2'
    }
  },

  'Archivos': {
    label: 'Archivos',
    sheetName: 'Archivos',
    columns: [
      'fecha',
      'sucursal',
      'sugeridoPor',
      'archivo',
      'comentario'
    ],
    validations: {
      sucursal: 'B2',
      sugeridoPor: 'C2'
    }
  },

  'Automatizaciones': {
    label: 'Automatizaciones',
    sheetName: 'Automatizaciones',
    columns: [
      'fecha',
      'sucursal',
      'sugeridoPor',
      'comentario'
    ],
    validations: {
      sucursal: 'B2',
      sugeridoPor: 'C2'
    }
  },

  'Implementar': {
    label: 'Implementar',
    sheetName: 'Implementar',
    columns: [
      'fecha',
      'sucursal',
      'sugeridoPor',
      'comentario'
    ],
    validations: {
      sucursal: 'B2',
      sugeridoPor: 'C2'
    }
  }
};

// ============================================
// GET
// ============================================

function doGet(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    const action = params.action || 'status';

    let response;

    if (action === 'status') {
      response = {
        ok: true,
        message: 'Backend activo',
        time: formatDate(new Date())
      };
    } else if (action === 'config') {
      response = {
        ok: true,
        data: getConfig()
      };
    } else if (action === 'list') {
      response = {
        ok: true,
        data: listResponses(params.sheet)
      };
    } else {
      response = {
        ok: false,
        message: 'Acción no válida: ' + action
      };
    }

    return output(response, params.callback);

  } catch (error) {
    logEvent('GET_ERROR', '', 'ERROR', error.message, {});

    const params = e && e.parameter ? e.parameter : {};

    return output({
      ok: false,
      message: error.message
    }, params.callback);
  }
}

// ============================================
// POST
// ============================================

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const data = parsePostData(e);
    const tipo = clean(data.tipo);

    if (!tipo) {
      throw new Error('No se recibió el campo tipo.');
    }

    if (!SHEETS_CONFIG[tipo]) {
      throw new Error('Tipo de sugerencia no válido: ' + tipo);
    }

    const config = SHEETS_CONFIG[tipo];

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(config.sheetName);

    if (!sheet) {
      throw new Error('No existe la hoja: ' + config.sheetName);
    }

    const row = config.columns.map(function (col) {
      if (col === 'fecha') return new Date();
      return clean(data[col]);
    });

    sheet.appendRow(row);

    logEvent(
      'CREATE',
      config.sheetName,
      'OK',
      'Sugerencia registrada correctamente',
      data
    );

    return output({
      ok: true,
      message: 'Sugerencia registrada correctamente'
    });

  } catch (error) {
    logEvent('POST_ERROR', '', 'ERROR', error.message, {});

    return output({
      ok: false,
      message: error.message
    });

  } finally {
    try {
      lock.releaseLock();
    } catch (err) {}
  }
}

// ============================================
// PARSE POST
// ============================================

function parsePostData(e) {
  if (!e) return {};

  // Formulario HTML normal
  if (e.parameter && Object.keys(e.parameter).length > 0) {
    return e.parameter;
  }

  // JSON en text/plain o application/json
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (error) {
      return {};
    }
  }

  return {};
}

// ============================================
// CONFIG
// ============================================

function getConfig() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  return Object.keys(SHEETS_CONFIG).map(function (key) {
    const config = SHEETS_CONFIG[key];
    const sheet = ss.getSheetByName(config.sheetName);

    const item = {
      key: key,
      label: config.label,
      sheetName: config.sheetName,
      columns: config.columns,
      options: {}
    };

    if (!sheet) {
      item.error = 'No existe la hoja: ' + config.sheetName;
      return item;
    }

    Object.keys(config.validations || {}).forEach(function (field) {
      item.options[field] = getValidationOptions(sheet, config.validations[field]);
    });

    return item;
  });
}

function getValidationOptions(sheet, cellA1) {
  try {
    const range = sheet.getRange(cellA1);
    const rule = range.getDataValidation();

    if (!rule) return [];

    const criteriaType = rule.getCriteriaType();
    const criteriaValues = rule.getCriteriaValues();

    if (criteriaType === SpreadsheetApp.DataValidationCriteria.VALUE_IN_LIST) {
      return (criteriaValues[0] || [])
        .map(function (v) {
          return clean(v);
        })
        .filter(Boolean);
    }

    if (criteriaType === SpreadsheetApp.DataValidationCriteria.VALUE_IN_RANGE) {
      return criteriaValues[0]
        .getValues()
        .flat()
        .map(function (v) {
          return clean(v);
        })
        .filter(Boolean);
    }

    return [];

  } catch (error) {
    Logger.log('Error en getValidationOptions: ' + error.message);
    return [];
  }
}

// ============================================
// LIST
// ============================================

function listResponses(sheetKey) {
  sheetKey = clean(sheetKey);

  if (!sheetKey) {
    throw new Error('No se recibió la pestaña a consultar.');
  }

  if (!SHEETS_CONFIG[sheetKey]) {
    throw new Error('Tipo de sugerencia no válido: ' + sheetKey);
  }

  const config = SHEETS_CONFIG[sheetKey];

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(config.sheetName);

  if (!sheet) {
    throw new Error('No existe la hoja: ' + config.sheetName);
  }

  const lastRow = sheet.getLastRow();
  const lastCol = config.columns.length;

  if (lastRow < 2) return [];

  const values = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  return values
    .filter(function (row) {
      return row.some(function (cell) {
        return cell !== '';
      });
    })
    .map(function (row, index) {
      const item = {
        rowNumber: index + 2
      };

      config.columns.forEach(function (col, i) {
        const value = row[i];

        if (value instanceof Date) {
          item[col] = formatDate(value);
        } else {
          item[col] = value;
        }
      });

      return item;
    })
    .reverse();
}

// ============================================
// OUTPUT JSON / JSONP
// ============================================

function output(data, callback) {
  const normalized = normalize(data);
  const json = JSON.stringify(normalized);

  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + json + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function normalize(value) {
  if (value instanceof Date) {
    return formatDate(value);
  }

  if (Array.isArray(value)) {
    return value.map(normalize);
  }

  if (value && typeof value === 'object') {
    const result = {};

    Object.keys(value).forEach(function (key) {
      result[key] = normalize(value[key]);
    });

    return result;
  }

  return value;
}

// ============================================
// LOG
// ============================================

function logEvent(action, sheetName, status, message, payload) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let logSheet = ss.getSheetByName('Log');

    if (!logSheet) {
      logSheet = ss.insertSheet('Log');
      logSheet.appendRow([
        'Fecha',
        'Acción',
        'Pestaña',
        'Estatus',
        'Mensaje',
        'Payload'
      ]);
    }

    logSheet.appendRow([
      new Date(),
      action,
      sheetName,
      status,
      message,
      JSON.stringify(payload || {})
    ]);

  } catch (error) {
    Logger.log('Error en logEvent: ' + error.message);
  }
}

// ============================================
// UTILS
// ============================================

function clean(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function formatDate(date) {
  return Utilities.formatDate(
    date,
    Session.getScriptTimeZone(),
    'yyyy-MM-dd HH:mm:ss'
  );
}

// ============================================
// TESTS
// ============================================

function testStatus() {
  Logger.log(JSON.stringify({
    ok: true,
    config: getConfig()
  }, null, 2));
}

function testPostApp() {
  const fakeEvent = {
    parameter: {
      tipo: 'App',
      sucursal: 'Querétaro',
      sugeridoPor: 'Prueba',
      comentario: 'Prueba desde Apps Script'
    }
  };

  const result = doPost(fakeEvent);
  Logger.log(result.getContent());
}