import { createApp } from '../src/main'

export default context => {

  return new Promise( async (resolve, reject) => {

    try{
      const { app, store } = createApp(context)

      context.rendered = () => {
        context.state = store.state
      };

      resolve(app)
    }
    catch(e) {
      reject(e)
    }
  })
}
