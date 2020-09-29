function getMenus () {
  const categoryInfos = {
    workCases: {
      title: '工作需求实例',
      icon: 'el-icon-message'
    },
    demoGames: {
      title: 'Demo小游戏',
      icon: 'el-icon-message'
    }
  }
  const menuTree = []
  let category = null
  let type = null
  let quiz = null
  const context = require.context('../views', true, /index\.vue$/)
  context.keys().forEach((key, index) => {
    const fullPath = key.match(/(?<=\.\/)\S+(?=\/index\.vue)/)[0]
    const pathNode = fullPath.split('/')
    if (!menuTree.some(i => i.title === categoryInfos[pathNode[0]].title)) {
      category = Object.assign({ id: 'category_' + index, data: [] }, categoryInfos[pathNode[0]])
      menuTree.push(category)
    } else {
      category = menuTree.find(i => i.title === categoryInfos[pathNode[0]].title)
    }
    if (!category.data.some(i => i.title === pathNode[1])) {
      type = {
        id: 'type_' + index,
        title: pathNode[1],
        data: []
      }
      category.data.push(type)
    }
    if (!type.data.some(i => i.title === pathNode[2])) {
      quiz = {
        id: 'quiz_' + index,
        title: pathNode[2],
        path: '/' + pathNode.slice(0, 3).join('/'),
        answers: []
      }
      type.data.push(quiz)
    }
    if (pathNode[3] === 'answers') {
      quiz.answers.push({
        id: 'answers_' + index,
        title: pathNode[4],
        path: '/' + pathNode.join('/')
      })
    }
  })
  return menuTree
}

const menus = getMenus()

export default menus
