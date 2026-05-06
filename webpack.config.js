import { fileURLToPath } from 'url';
import path from 'path';
import webpack from 'webpack';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === 'development';
export default {
  entry: './src/index.ts',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devServer: {
    port: 9002,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    hot: true,
    open: false,
  },
  output: {
    publicPath: 'auto',
    library: { type: 'window', name: 'enterprise_ui' },
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@mui/material': path.resolve(__dirname, 'node_modules/@mui/material'),
      '@mui/system': path.resolve(__dirname, 'node_modules/@mui/system'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: 'enterprise_ui',
      filename: 'remoteEntry.js',
      exposes: {
        './atoms': './src/atoms/index.ts',
        './molecules': './src/molecules/index.ts',
      },
      shared: {
        react: {
          singleton: true,
          strictVersion: true,
          requiredVersion: '19.2.x',
        },
        'react-dom': {
          singleton: true,
          strictVersion: true,
          requiredVersion: '19.2.x',
        },
        'react-router-dom': { singleton: true, requiredVersion: '7.x.x' },
        'react-redux': { singleton: true, requiredVersion: '9.x.x' },
        '@reduxjs/toolkit': { singleton: true, requiredVersion: '2.x.x' },
        '@mui/material': { singleton: true, requiredVersion: '7.x.x' },
        '@mui/system': { singleton: true, requiredVersion: '7.x.x' },
        '@emotion/react': { singleton: true, requiredVersion: '11.x.x' },
        '@emotion/styled': { singleton: true, requiredVersion: '11.x.x' },
        rxjs: { singleton: true, requiredVersion: '7.x.x' },
      },
    }),
    new webpack.DefinePlugin({
      'process.env.TENANT_CONFIG_BASE_URL': JSON.stringify(
        process.env.TENANT_CONFIG_BASE_URL,
      ),
    }),
  ],
};
