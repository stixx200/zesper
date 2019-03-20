module.exports = {
  name: 'zesper',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/zesper/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
