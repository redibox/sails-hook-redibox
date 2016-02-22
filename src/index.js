/**
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Invertase
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

import RediBox from 'redibox';

export default function (sails) {
  const services = require('sails-util-mvcsloader')(sails);
  return {
    initialize: function (next) {
      if (!sails.config.redibox && !sails.config.hooks.redibox) {
        return next(new Error('No RediBox config found at sails.config.hooks.redibox, aborting!'));
      }
      const eventsToWaitFor = ['hook:orm:loaded'];

      sails.after(eventsToWaitFor, () => {
        this.instance = new RediBox(sails.config.redibox || sails.config.hooks.redibox);
        this.instance.on('ready', function (status) {
          sails.log.verbose('Redibox: ', status);
          services.injectAll({
            controllers: __dirname + '/api/controllers', // Path to your hook's controllers
            services: __dirname + '/api/services' // Path to your hook's services
          }, function (error) {
            return next(error);
          });
        });
      });
    }
  };
}



