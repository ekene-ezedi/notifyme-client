importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

console.log('Hello from service-worker.js');

workbox.setConfig({
  debug: true
});
  // Serve all html files with StaleWhileRevalidate strategy
  workbox.routing.registerRoute(
    /\.html$/,
    new workbox.strategies.NetworkFirst()
  )
  
  // Serve all css files with StaleWhileRevalidate strategy
  workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.StaleWhileRevalidate()
  )
  
  // Serve all css files with StaleWhileRevalidate strategy
  workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.StaleWhileRevalidate()
  )
  
  // Serve all other assets with CacheFirst strategy
  workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif|webp|ico|webmanifest|eot,ttf,woff,woff2)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'staticAssets',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 20,
          maxAgeSeconds: 30 * 24 * 60 * 60
        })
      ]
    })
  )


const handler = workbox.precaching.createHandlerBoundToURL('index.html');
const navigationRoute = new workbox.routing.NavigationRoute(handler);
workbox.routing.registerRoute(navigationRoute);

workbox.precaching.precacheAndRoute([{"revision":"3d8d4ff7271b831fe451c6495353177f","url":"app/app.component.css"},{"revision":"2990baf01e0e02fa0be516fb9db6666d","url":"app/app.component.html"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"app/auth/forgot-password/forgot-password.component.css"},{"revision":"74db88ba9b224843d328139593891c80","url":"app/auth/forgot-password/forgot-password.component.html"},{"revision":"26073660359a6545bad69627172a8b81","url":"app/auth/signin/signin.component.css"},{"revision":"59ac14246cdcf5485c0f36cfca8d4d13","url":"app/auth/signin/signin.component.html"},{"revision":"0553e0991dbb2eadb65d6b2a0a9dc90e","url":"app/auth/signup/signup.component.css"},{"revision":"1213284e952a9c166fe90c27dbe02656","url":"app/auth/signup/signup.component.html"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"app/auth/verifyaccount/verifyaccount.component.css"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"app/auth/verifyaccount/verifyaccount.component.html"},{"revision":"7ea492c3b8c8944da2dec0033db7e246","url":"app/main/channel-comp/channel/channel.component.css"},{"revision":"bb84a531de21ac986913a669c1abb51c","url":"app/main/channel-comp/channel/channel.component.html"},{"revision":"6f87e8f469f0ef8e9adfd7835ec689aa","url":"app/main/channel-comp/channelcat/channelcat.component.css"},{"revision":"5ba88f34a374d82d6593242cefa08fff","url":"app/main/channel-comp/channelcat/channelcat.component.html"},{"revision":"4fdbcb97d498ea8bd750b2118d45d709","url":"app/main/channel-comp/channellist/channellist.component.css"},{"revision":"54300268fbf05a84659975ff6680f859","url":"app/main/channel-comp/channellist/channellist.component.html"},{"revision":"7e1de33435e7457f828404a7ee5b880f","url":"app/main/channel-comp/create/create.component.css"},{"revision":"a19ffaa87479e31b6e4ed08eaa7d4451","url":"app/main/channel-comp/create/create.component.html"},{"revision":"8a26b528dc9c0c2f46db9a4ce6d0c243","url":"app/main/channel-comp/explore/explore.component.css"},{"revision":"0cca8ec1a16848af74e06758b3140bda","url":"app/main/channel-comp/explore/explore.component.html"},{"revision":"a5c1dbd4861f3ff1cebd8734d6deb40b","url":"app/main/channel-comp/my-channels/my-channels.component.css"},{"revision":"09f29a30709552f667f8ae52b39180ae","url":"app/main/channel-comp/my-channels/my-channels.component.html"},{"revision":"8a26b528dc9c0c2f46db9a4ce6d0c243","url":"app/main/channel-comp/my-subscriptions/my-subscriptions.component.css"},{"revision":"01c8639d645072f2f9e16471519947bc","url":"app/main/channel-comp/my-subscriptions/my-subscriptions.component.html"},{"revision":"8a26b528dc9c0c2f46db9a4ce6d0c243","url":"app/main/event-comp/create-event/create-event.component.css"},{"revision":"555902a148d18093067a43a06f3a8d94","url":"app/main/event-comp/create-event/create-event.component.html"},{"revision":"320f15969690260021a7d4ff78b32c84","url":"app/main/event-comp/event-feed/event-feed.component.css"},{"revision":"e37496bea25c0aaf174d64328d436b40","url":"app/main/event-comp/event-feed/event-feed.component.html"},{"revision":"06b717360ac26463d7be7bda1f81897a","url":"app/main/event-comp/event/event.component.css"},{"revision":"59a214cca01353fa8e1d66d6e2d11c40","url":"app/main/event-comp/event/event.component.html"},{"revision":"85e4bc9f7db8b9a84584689014ba53c6","url":"app/main/event-comp/eventlist/eventlist.component.css"},{"revision":"0fa3fab3da715f2d9070185c56b015eb","url":"app/main/event-comp/eventlist/eventlist.component.html"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"app/main/event-comp/upcoming-eventlist/upcoming-eventlist.component.css"},{"revision":"c9d3b9cd9485b3357a409b8196d7258e","url":"app/main/event-comp/upcoming-eventlist/upcoming-eventlist.component.html"},{"revision":"8a26b528dc9c0c2f46db9a4ce6d0c243","url":"app/main/event-comp/update-event/update-event.component.css"},{"revision":"340a7ab585033c837f0f7e258ab44dc3","url":"app/main/event-comp/update-event/update-event.component.html"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"app/main/home/home.component.css"},{"revision":"db693201c8de661f14051c19b6bb2f7b","url":"app/main/home/home.component.html"},{"revision":"8a26b528dc9c0c2f46db9a4ce6d0c243","url":"app/main/notifications/notifications.component.css"},{"revision":"551e83f52a336e994461433876c0ae4c","url":"app/main/notifications/notifications.component.html"},{"revision":"8a26b528dc9c0c2f46db9a4ce6d0c243","url":"app/main/profile/profile.component.css"},{"revision":"45119dc1709d238b7642c46b81f84ffa","url":"app/main/profile/profile.component.html"},{"revision":"e8c68c66800b259b3022e497cebf247e","url":"app/navigation/sidenav/sidenav.component.css"},{"revision":"89000b92cf383679a3d0a6a90dcc3ca0","url":"app/navigation/sidenav/sidenav.component.html"},{"revision":"0e52ae77af0b73bba56290217208e827","url":"app/navigation/toolbar/toolbar.component.css"},{"revision":"a51825d3a58c8330ec1fe7cff994e174","url":"app/navigation/toolbar/toolbar.component.html"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"app/page404/page404.component.css"},{"revision":"e3d3da99a4d1273f6eb5d38a44c3d65f","url":"app/page404/page404.component.html"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"app/shared/loader/loader.component.css"},{"revision":"6572ac4211b9f08f3c6c6b4daf94c3e2","url":"app/shared/loader/loader.component.html"},{"revision":"f95a69c15606b9c3a9c6452fc3d20ef4","url":"app/splashscreen/splashscreen.component.css"},{"revision":"3a9e4209b5073c890e6561ab883bf69f","url":"app/splashscreen/splashscreen.component.html"},{"revision":"2206c9fb0197956129137af662b31115","url":"bootstrap-grid.min.css"},{"revision":"1d937338539e65ae0550de673cd8ba15","url":"custom-theme.scss"},{"revision":"450fe8f4a19058b76bd355abff15073d","url":"favicon.ico"},{"revision":"4ec208e03d31572e6827469cd6727bd6","url":"index.html"},{"revision":"57d32a46a9c90ed8e77f8639b092572d","url":"styles.css"},{"revision":"d8f361886006c8c2789238ee0b7ee8dd","url":"assets/images/art.jpg"},{"revision":"7806298c40dc0baad4f3cc0370d03aa4","url":"assets/images/business.jpg"},{"revision":"fcb61ca0b5c6f3dbc0d18f586ce84ebd","url":"assets/images/entertainment.jpg"},{"revision":"4481fb63b28c4b00457407be71911ed0","url":"assets/images/health.jpg"},{"revision":"2e3bd852e19dc71aeb5e1e970afdc46d","url":"assets/images/ic_person_outline_black_48dp.png"},{"revision":"514a167e1e123c3584b7ca197b897853","url":"assets/images/images-button.png"},{"revision":"267837711978bdf6704c395f71c22156","url":"assets/images/notification.png"},{"revision":"503161cf2e16cfd75142d605ecf9ed41","url":"assets/images/politics.jpg"},{"revision":"12323ed8c227d22516e09334bb953b8a","url":"assets/images/sports.jpg"},{"revision":"9fbe26211792bc97a5d138187b779db8","url":"assets/images/tech.jpg"}])  