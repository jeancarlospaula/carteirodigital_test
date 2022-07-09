const { rastrearEncomendas } = require('correios-brasil')

const tracking = async (code) => {
  let data

  await rastrearEncomendas([code])
    .then((res) => {
      data = res
    })
    .catch((error) => {
      throw error
    })

  return data
}

module.exports = { tracking }
