const manageQuestionTab = {
  NEEDS_ACTION: { id: 0, key: 'needs_action', name: '要対応' },
  WAITING_USER_REPLY: { id: 1, key: 'waiting_user_reply', name: '返答待ち' },
  RESOLVED: { id: 2, key: 'resolved', name: '解決済' },
  getAll() {
    return [this.NEEDS_ACTION, this.WAITING_USER_REPLY, this.RESOLVED]
  },
}

export default manageQuestionTab
