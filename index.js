import idbGetData from './scripts/idbGet';
import idbStart from './scripts/idbStart';
import * as logger from 'loglevel';
import './style.css';

logger.enableAll();

const dbName = 'libraryDB';
// idbStart(dbName);
idbGetData(dbName);
