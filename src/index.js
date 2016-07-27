import RediBox from 'redibox';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function (sails) {
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
          sails.log.verbose(!status ? 'Redibox is now ready!' : status);
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
}
