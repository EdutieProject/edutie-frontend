 const lessons = [
    {
      id: 0,
      name: 'Github',
      icon: 'github.svg',
      active: true,
      done: false,
      next: 1
      
    },
    {
      id: 1,
      name: 'VsCode',
      icon: 'vscode.svg',
      next: 2,
      previous: 0,
      active: false,
      done: false
    },
    {
      id: 2,
      name: 'InteliJ',
      icon: 'intelij.svg',
      next: 3,
      previous: 1,
      active: false,
      done: false
    },
  ];

 const trees = [
    {
        id:[0,1,2 ],
        active:[true,false,false]
    }
]

export {lessons, trees}