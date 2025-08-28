import '@testing-library/jest-dom';

// Polyfill TextEncoder for Jest
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;