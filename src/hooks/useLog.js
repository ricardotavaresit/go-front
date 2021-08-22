
import { useContext } from 'react';
import { LogContext } from '../context/LogContext';

export const useLog = () => useContext(LogContext);
 