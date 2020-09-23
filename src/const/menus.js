export default [
  {
    id: '1',
    title: '工作需求实例',
    icon: 'el-icon-message',
    data: [
      {
        id: '10001',
        title: 'CSS',
        data: [
          {
            id: '100010001',
            title: 'DataTable',
            path: '/css/dataTable',
            answers: [
              {
                id: '1000100010001',
                title: 'csc',
                path: '/css/dataTable/answers/csc'
              },
              {
                id: '1000100010002',
                title: 'eki',
                path: '/css/dataTable/answers/eki'
              }
            ]
          },
          {
            id: '100010002',
            title: 'Scalable Rectangle',
            path: '/canvas/rectScale',
            answers: [
              {
                id: '1000100020001',
                title: 'eki',
                path: '/canvas/rectScale/answers/eki'
              }
            ]
          }
        ]
      },
      {
        id: '20001',
        title: 'Echarts',
        data: [
          {
            id: '200010001',
            title: 'Yearline',
            path: '/echarts/yearline',
            answers: [
              {
                id: '2000100010001',
                title: 'eki',
                path: '/echarts/yearline/answers/eki'
              }
            ]
          }
        ]
      }
    ]
  }
]
