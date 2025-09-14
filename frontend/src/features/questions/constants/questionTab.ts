const questionTab = {
  // NEW: { id: 0, key: 'new', name: '新着' },
  NEW: { id: 0, key: 'new', name: 'みんなの質問' },
  //   POPULAR: { id: 1, key: 'popular', name: '人気' },
  //   UNANSWERED: { id: 2, key: 'unanswered', name: '未回答' },
  // RESOLVED: { id: 3, key: 'resolved', name: '解決済' },
  //   UNRESOLVED: { id: 4, key: 'unresolved', name: '未解決' },
  MY: { id: 5, key: 'my', name: 'あなたの質問' },
  getAll() {
    return [this.NEW, this.MY]
  },
}

export default questionTab
