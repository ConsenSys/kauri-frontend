const express = require('express')
const path = require('path')

module.exports = router => {
  router.use('/static', express.static(path.join(__dirname, '../../kauri-web', 'static')))
}