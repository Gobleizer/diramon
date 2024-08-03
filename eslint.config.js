import config from "eslint-config-standard";
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default [
  ...compat.extends('eslint-config-standard'),
];