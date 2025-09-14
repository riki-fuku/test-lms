class MeetingDeletionRequestStatusClass {
  static readonly PENDING = { id: 1, key: 'pending' }
  static readonly ACCEPTED = { id: 2, key: 'accepted' }
  static readonly REJECTED = { id: 3, key: 'rejected' }
  static readonly ALL = [this.PENDING, this.ACCEPTED, this.REJECTED]
}

export default MeetingDeletionRequestStatusClass
