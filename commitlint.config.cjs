module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // thêm tính năng mới
        'fix',  // sửa bug
        'docs', // cập nhật tài liệu
        'style',// thay đổi format, prettier, eslint (không ảnh hưởng code)
        'refactor', // refactor code
        'perf', // tối ưu hiệu năng
        'test', // thêm hoặc sửa test
        'chore', // các việc linh tinh (update deps, config)
        'ci', // thay đổi CI/CD
        'build', // thay đổi build system
        'revert' // revert commit
      ]
    ],
    'subject-case': [0], // tạm cho phép subject tự do (viết hoa/thường đều ok)
  },
};
