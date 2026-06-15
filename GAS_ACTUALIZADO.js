// ============================================
// GOOGLE APPS SCRIPT - Sugerencias MCV
// ============================================
// Copia esto a tu Google Apps Script en Drive
// ============================================

const SPREADSHEET_ID = '1yAt53Rhe0uZuJRtvk0bIgD5Ay0NigQbrxBF0PZw2M6M';

// Orígenes permitidos para CORS
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5500',
  'http://localhost:8000',
  'http://localhost',
  'http://127.0.0.1',
  'https://sugerencias-7ufd8o37n-equis01s-projects.vercel.app',
  'https://tuusuario.github.io',
  'https://mediosconvalor.github.io'
];

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

// Función para obtener headers CORS
function getCorsHeaders(e) {
  const origin = e.parameter?.origin || e.request?.headers?.origin || '';
  
  const isAllowed = ALLOWED_ORIGINS.some(allowed => 
    origin.toLowerCase().includes(allowed.toLowerCase().replace('https://', '').replace('http://', ''))
  );
  
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=UTF-8'
  };
}

// Manejar OPTIONS (preflight)
function doOptions(e) {
  const headers = getCorsHeaders(e);
  return ContentService
    .createTextOutput()
    .setMimeType(ContentService.MimeType.JSON)
    .addHeaders(headers);
}

function doGet(e) {
  try {
    const headers = getCorsHeaders(e);
    const action = e.parameter?.action || 'config';

    if (action === 'config') {
      return jsonResponse({
        ok: true,
        data: getConfig()
      }, headers);
    }

    if (action === 'list') {
      const sheetKey = e.parameter?.sheet;
      return jsonResponse({
        ok: true,
        data: listResponses(sheetKey)
      }, headers);
    }

    return jsonResponse({
      ok: false,
      message: 'Acción no válida'
    }, headers);

  } catch (error) {
    logEvent('GET_ERROR', '', 'ERROR', error.message, {});
    return jsonResponse({
      ok: false,
      message: error.message
    }, getCorsHeaders(e));
  }
}

function doPost(e) {
  try {
    const headers = getCorsHeaders(e);
    const data = JSON.parse(e.postData?.contents || '{}');
    const sheetKey = data.tipo;

    if (!SHEETS_CONFIG[sheetKey]) {
      throw new Error('Tipo de sugerencia no válido: ' + sheetKey);
    }

    const config = SHEETS_CONFIG[sheetKey];
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(config.sheetName);

    if (!sheet) {
      throw new Error('No existe la hoja: ' + config.sheetName);
    }

    const row = config.columns.map((col) => {
      if (col === 'fecha') return new Date();
      return data[col] || '';
    });

    sheet.appendRow(row);

    logEvent(
      'CREATE',
      config.sheetName,
      'OK',
      'Sugerencia registrada correctamente',
      data
    );

    return jsonResponse({
      ok: true,
      message: 'Sugerencia registrada correctamente'
    }, headers);

  } catch (error) {
    logEvent('POST_ERROR', '', 'ERROR', error.message, {});
    return jsonResponse({
      ok: false,
      message: error.message
    }, getCorsHeaders(e));
  }
}

function getConfig() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  const result = Object.keys(SHEETS_CONFIG).map((key) => {
    const config = SHEETS_CONFIG[key];
    const sheet = ss.getSheetByName(config.sheetName);

    const options = {};

    Object.keys(config.validations).forEach((field) => {
      const cellA1 = config.validations[field];
      options[field] = getValidationOptions(sheet, cellA1);
    });

    return {
      key,
      label: config.label,
      columns: config.columns,
      options
    };
  });

  return result;
}

function getValidationOptions(sheet, cellA1) {
  try {
    const range = sheet.getRange(cellA1);
    const rule = range.getDataValidation();

    if (!rule) return [];

    const criteriaType = rule.getCriteriaType();
    const criteriaValues = rule.getCriteriaValues();

    if (criteriaType === SpreadsheetApp.DataValidationCriteria.VALUE_IN_LIST) {
      return criteriaValues[0] || [];
    }

    if (criteriaType === SpreadsheetApp.DataValidationCriteria.VALUE_IN_RANGE) {
      const validationRange = criteriaValues[0];
      return validationRange
        .getValues()
        .flat()
        .filter(String);
    }

    return [];
  } catch (error) {
    Logger.log('Error en getValidationOptions: ' + error.message);
    return [];
  }
}

function listResponses(sheetKey) {
  if (!SHEETS_CONFIG[sheetKey]) {
    throw new Error('Tipo de sugerencia no válido');
  }

  const config = SHEETS_CONFIG[sheetKey];
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(config.sheetName);

  const lastRow = sheet.getLastRow();
  const lastCol = config.columns.length;

  if (lastRow < 2) return [];

  const values = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  return values
    .filter(row => row.some(cell => cell !== ''))
    .map((row, index) => {
      const item = {
        rowNumber: index + 2
      };

      config.columns.forEach((col, colIndex) => {
        item[col] = row[colIndex];
      });

      return item;
    })
    .reverse();
}

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
      JSON.stringify(payload)
    ]);
  } catch (error) {
    Logger.log('Error en logEvent: ' + error.message);
  }
}

function jsonResponse(data, headers) {
  const output = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  
  if (headers) {
    output.addHeaders(headers);
  }
  
  return output;
}
