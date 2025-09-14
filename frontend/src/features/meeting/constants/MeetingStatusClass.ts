class MeetingStatusClass {
  static readonly NOT_IMPLEMENTED = { id: 1, name: '未実施' }
  static readonly IMPLEMENTED = { id: 2, name: '実施済' }
  static readonly CANCELED = { id: 3, name: 'キャンセル' }
  static readonly ALL = [this.NOT_IMPLEMENTED, this.IMPLEMENTED, this.CANCELED]
}

export default MeetingStatusClass
