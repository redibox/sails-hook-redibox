/**
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 RediBox
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

const RediBox = require('redibox').default;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function hook(sails) {
  return {
    initialize(next) {
      if (!sails.config.redibox && !sails.config.hooks.redibox) {
        sails.log.warn('No RediBox config found at sails.config.redibox, aborting redibox load!');
        return next();
      }

      return sails.after(['hook:orm:loaded'], () => {
        this.instance = new RediBox(sails.config.redibox || sails.config.hooks.redibox);
        this.instance.on('ready', (status) => {
          const hooks = Object.keys(this.instance.hooks);
          sails.log.verbose(!status ? 'RediBox is now ready!' : status);
          global.RediBox = this.instance;
          for (let i = 0, iLen = hooks.length; i < iLen; i++) {
            const key = hooks[i];
            global[capitalizeFirstLetter(key)] = this.instance.hooks[key];
          }
          next();
        });
      });
    },
  };
};
