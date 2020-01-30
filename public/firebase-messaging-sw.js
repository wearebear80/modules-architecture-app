importScripts('https://www.gstatic.com/firebasejs/6.6.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/6.6.0/firebase-messaging.js')
firebase.initializeApp({
  messagingSenderId: '174748760882'
})
const messaging = firebase.messaging()

class CustomPushEvent extends Event {
  constructor(data) {
    super('push')

    Object.assign(this, data)
    this.custom = true
  }
}

self.addEventListener('push', (e) => {
  if (e.custom) return

  const data = e.data

  e.waitUntil(clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(clientList => {
    for (var i = 0; i < clientList.length; i++) {
      const client = clientList[i]

      client.postMessage({
        type: 'firebase-message',
        payload: data.json()
      })
    }
  }))

  // Create a new event to dispatch
  const newEvent = new CustomPushEvent({
    data: {
      json() {
        let newData = data.json()
        newData._notification = newData.notification
        delete newData.notification
        return newData
      },
    },
    waitUntil: e.waitUntil.bind(e)
  })

  // Stop event propagation
  e.stopImmediatePropagation()
  e.stopPropagation()
  e.preventDefault()

  // Dispatch the new wrapped event
  dispatchEvent(newEvent)
})

messaging.setBackgroundMessageHandler((payload) => {
  const { title, body, icon, click_action } = payload._notification

  const notificationOptions = {
    title,
    body,
    icon,
    data: click_action
  }

  return self.registration.showNotification(title, notificationOptions)
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(clients.matchAll({
    type: "window",
    includeUncontrolled: true
  }).then(clientList => {
    for (var i = 0; i < clientList.length; i++) {
      const client = clientList[i]
      const url = new URL(event.notification.data)
      const { pathname, search } = url

      if (client.url == event.notification.data && 'focus' in client) {
        return client.focus()
      } else {
        client.postMessage({
          type: 'redirect',
          payload: pathname + search
        })
        return client.focus()
      }
    }

    if (clients.openWindow)
      return clients.openWindow(event.notification.data)
  }))
})
