exports.unwrap = collection => {
  var result = []

  collection.forEach(doc => result.push(
    Object.assign({}, {id: doc.id}, doc.data())
  ))

  return result
}

exports.combine = (obj, obj2, obj3 = {}) => Object.assign({}, obj, obj2, obj3)

exports.sum = item => {
  if (typeof item === "object") {
    return item.reduce((a, b) => a + b)
  }
}

exports.cleanAmount = amount => {
  let values = amount.toString().split('.')

  if (values.length > 1) {
    if (values[1].length < 2) {
      values[1] = values[1] + '0'
    }

    return Number(values.join(''))
  }

  return Number(values.join('') + '00')
}