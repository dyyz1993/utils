module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [2, 'always', [
        "feat", //（feature，新功能，能够让用户觉察到的变化）
        "fix",  //（bug fix，修复 bug）
        "docs", //（documentation，有关文档的更新，注释的更新）
        "style", //（code formatting, missing semi colons, … 代码样式调整，对逻辑无影响，比如为符合 eslint 要求修改代码格式）
        "refactor", //（重构，不影响或添加功能，比如文件、变量重命名、代码抽象为函数，消除魔法数字）
        "test", //（when adding missing tests 写测试）
        "chore", //（maintain 维护代码，比如构建脚本 webpack gulp、测试工具更新）
        "revert", // 回滚某个更早之前的提交
        "perf", //（性能提升）
        "ci", //（ci 脚本有关变更）
      ]],
      'subject-full-stop': [0, 'never'],
      'subject-case': [0, 'never']
    }
  };