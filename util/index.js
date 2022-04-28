#!/usr/bin/env node
import {execa} from 'execa'
export function openBrowser(url) {
  // TODO: 兼容问题
  execa(`start ${url}`)
}