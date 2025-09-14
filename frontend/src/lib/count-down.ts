addEventListener('message', (e) => {
  let remainSecond = e.data.time
  const intervalId = setInterval(() => {
    remainSecond--
    postMessage({ intervalId, remainSecond })
  }, 1000)
})
