function addUnderscores (page) {
  if (page.trim().indexOf(' ') !== -1) {
    page.replace(' ', '_')
  }
  return page.toLowerCase()
}

function wikicall (concept, callback) {
  const wikiURL = 'http://en.wikipedia.org/'
  const apiPath = 'w'
  var page = addUnderscores(concept)

  $.ajax({
    type: 'GET',
    url: wikiURL + apiPath + '/api.php?action=parse&format=json&prop=sections&page=' + page + '&callback=?&redirects',
    contentType: 'application/json; charset=utf-8',
    async: true,
    dataType: 'json',
    success: function (data, textStatus, jqXHR) {
      try {
        var sections = data.parse.sections
        var id
        for (var i = 0; i < sections.length; i++) {
          console.log(sections[i])
          if (sections[i].line === 'See also') {
            id = i
            console.log('section ' + i + ' contains related concepts')
          }
        }
        // var markup = data.parse.text['*']
        callback(id)
      } catch (e) {
        console.log(e)
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown)
    }
  })
}
