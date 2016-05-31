import RediBox from 'redibox';

export default function (sails) {
  const services = require('sails-util-mvcsloader')(sails);
  return {
    initialize(next) {
      if (!sails.config.redibox && !sails.config.hooks.redibox) {
        next(new Error('No RediBox config found at sails.config.hooks.redibox, aborting!'));
      } else {
        sails.after(['hook:orm:loaded'], () => {
          this.instance = new RediBox(sails.config.redibox || sails.config.hooks.redibox);
          this.instance.on('ready', (status) => {
            sails.log.verbose('Redibox: ', status);
            services.injectAll({
              controllers: `${__dirname}/api/controllers`, // Path to your hook's controllers
              services: `${__dirname}/api/services`, // Path to your hook's services
            }, error => next(error));
          });
        });
      }
    },
  };
}
