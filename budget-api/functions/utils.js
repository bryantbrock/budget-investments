exports.unwrap = collection => {
  var result = []

  collection.forEach(doc => result.push(
    Object.assign({}, {id: doc.id}, doc.data())
  ))

  return result
}

exports.combine = (obj, obj2) => Object.assign({}, obj, obj2)