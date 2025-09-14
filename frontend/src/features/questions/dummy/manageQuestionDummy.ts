import { CONSULTATION, Q_AND_A } from '@/features/questions/types/QuestionCategory'

export const manageAnswerStatsDummy = {
  answer_total: 430,
  answer_count: {
    today: 5,
    week: 25,
    month: 100,
  },
  best_answer_total: 140,
  best_answer_count: {
    month: 30,
  },
  good_total: 26,
  good_count: {
    month: 30,
  },
  available_tags: [
    {
      id: 1,
      name: 'laravel',
    },
  ],
}

export const metaDummy = {
  pagination: {
    total: 1,
    per_page: 10,
    current_page: 1,
    last_page: 1,
    first_page_url: 'http://example.com?page=1',
    last_page_url: 'http://example.com?page=1',
    prev_page_url: null,
    from: 1,
  },
  count: {
    needs_action_count: 20,
    waiting_user_reply_count: 10,
  },
}

export const manageQuestionsDummy = [
  {
    id: 1,
    category: Q_AND_A,
    title: 'title',
    content: 'content',
    status: 1,
    created_at: '2024-8-03 18:44',
    updated_at: '2024-8-03 19:50',
    has_best_answer: false,
    user: {
      id: 'aaa',
      name: '山田 太郎',
    },
    tags: [
      {
        id: 1,
        name: 'laravel',
      },
    ],
    answers: [
      {
        id: 1,
        user_query_id: 1,
        content: 'content',
        is_best_answer: false,
        created_at: '2024-8-01T02:00:00',
        updated_at: '2024-8-01T03:00:00',
        user: {
          id: 'bbb',
          name: '山田 二郎',
        },
        user_query: {
          id: 1,
          title: 'title',
          content: 'content',
          created_at: '2024-8-01T00:00:00',
          updated_at: '2024-8-01T01:00:00',
        },
        comments: [
          {
            id: 1,
            user_query_answer_id: 1,
            content: 'content',
            created_at: '2024-8-01T02:00:00',
            updated_at: '2024-8-01T03:00:00',
            user: {
              id: 'ccc',
              name: '山田 三郎',
            },
          },
        ],
      },
    ],
    comments: [
      {
        id: 1,
        user_query_id: 1,
        content: 'content',
        created_at: '2024-8-01T02:00:00',
        updated_at: '2024-8-01T03:00:00',
        user: {
          id: 'ddd',
          name: '山田 四郎',
        },
      },
    ],
    policy_agreed_at: '2024-8-01T00:00:00',
    is_public: false,
    question_responder: null,
    last_responder: {
      id: 'bbb',
      name: '山田 二郎',
    },
  },
  {
    id: 2,
    category: CONSULTATION,
    title: 'title',
    content: 'content',
    status: 3,
    created_at: '2024-8-01 00:00',
    updated_at: '2024-8-01 01:00',
    has_best_answer: true,
    user: {
      id: 'aaa',
      name: '山田 太郎',
    },
    tags: [
      {
        id: 1,
        name: 'laravel',
      },
    ],
    answers: [
      {
        id: 2,
        user_query_id: 2,
        content: 'content',
        is_best_answer: true,
        created_at: '2024-8-01T02:00:00',
        updated_at: '2024-8-01T03:00:00',
        user: {
          id: 'bbb',
          name: '山田 二郎',
        },
        user_query: {
          id: 2,
          title: 'title',
          content: 'content',
          created_at: '2024-8-01T00:00:00',
          updated_at: '2024-8-01T01:00:00',
        },
        comments: [
          {
            id: 1,
            user_query_answer_id: 2,
            content: 'content',
            created_at: '2024-8-01T02:00:00',
            updated_at: '2024-8-01T03:00:00',
            user: {
              id: 'ccc',
              name: '山田 三郎',
            },
          },
        ],
      },
    ],
    comments: [
      {
        id: 1,
        user_query_id: 2,
        content: 'content',
        created_at: '2024-8-01T02:00:00',
        updated_at: '2024-8-01T03:00:00',
        user: {
          id: 'ddd',
          name: '山田 四郎',
        },
      },
    ],
    policy_agreed_at: '2024-8-01T00:00:00',
    is_public: true,
    question_responder: null,
    last_responder: {
      id: 'bbb',
      name: '山田 二郎',
    },
  },
  {
    id: 3,
    category: CONSULTATION,
    title: 'title',
    content: 'content',
    status: 2,
    created_at: '2024-8-01 00:00',
    updated_at: '2024-8-01 01:00',
    has_best_answer: false,
    user: {
      id: 'aaa',
      name: '山田 太郎',
    },
    tags: [
      {
        id: 1,
        name: 'laravel',
      },
    ],
    answers: [],
    comments: [],
    policy_agreed_at: '2024-8-01T00:00:00',
    is_public: true,
    question_responder: {
      id: 'bbb',
      name: '山田 二郎',
    },
    last_responder: {
      id: 'bbb',
      name: '山田 二郎',
    },
  },
  {
    id: 4,
    category: CONSULTATION,
    title: 'title',
    content: 'content',
    status: 1,
    created_at: '2024-8-01 00:00',
    updated_at: '2024-8-01 01:00',
    has_best_answer: false,
    user: {
      id: 'aaa',
      name: '山田 太郎',
    },
    tags: [
      {
        id: 1,
        name: 'laravel',
      },
    ],
    answers: [],
    comments: [],
    policy_agreed_at: '2024-8-01T00:00:00',
    is_public: true,
    question_responder: null,
    last_responder: {
      id: 'bbb',
      name: '山田 二郎',
    },
  },
  {
    id: 5,
    category: CONSULTATION,
    title: 'title',
    content: 'content',
    status: 4,
    created_at: '2024-8-01 00:00',
    updated_at: '2024-8-01 01:00',
    has_best_answer: false,
    user: {
      id: 'aaa',
      name: '山田 太郎',
    },
    tags: [
      {
        id: 1,
        name: 'laravel',
      },
    ],
    answers: [],
    comments: [],
    policy_agreed_at: '2024-8-01T00:00:00',
    is_public: true,
    question_responder: {
      id: '25f5b066-3fcb-4ee1-a8ea-f74eb0cab4cc',
      name: '山田 二郎',
    },
    last_responder: {
      id: 'bbb',
      name: '山田 二郎',
    },
  },
  {
    id: 6,
    category: CONSULTATION,
    title: 'title',
    content: 'content',
    status: 3,
    created_at: '2024-8-01 00:00',
    updated_at: '2024-8-01 01:00',
    has_best_answer: false,
    user: {
      id: 'aaa',
      name: '山田 太郎',
    },
    tags: [
      {
        id: 1,
        name: 'laravel',
      },
    ],
    answers: [],
    comments: [],
    policy_agreed_at: '2024-8-01T00:00:00',
    is_public: true,
    question_responder: {
      id: 'bbb',
      name: '山田 二郎',
    },
    last_responder: {
      id: 'bbb',
      name: '山田 二郎',
    },
  },
]
