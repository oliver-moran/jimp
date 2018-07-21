const { Jimp, mkJGD, hasOwnProp } = require('./test-helper');

describe('All align combinations for cover and contain', () => {
  const verticalJGD = mkJGD(
    '▴▴▴▴▸▸▸▸',
    '▴▴▴▴▸▸▸▸',
    '▴▴▴▴▸▸▸▸',
    '▴▴▴▴▸▸▸▸',
    '▴▴▴▴▸▸▸▸',
    '▴▴▴▴▸▸▸▸',
    '▾▾▾▾◆◆◆◆',
    '▾▾▾▾◆◆◆◆',
    '▾▾▾▾◆◆◆◆',
    '▾▾▾▾◆◆◆◆',
    '▾▾▾▾◆◆◆◆',
    '▾▾▾▾◆◆◆◆'
  );

  const horizontalJGD = mkJGD(
    '▴▴▴▴▴▴▸▸▸▸▸▸',
    '▴▴▴▴▴▴▸▸▸▸▸▸',
    '▴▴▴▴▴▴▸▸▸▸▸▸',
    '▴▴▴▴▴▴▸▸▸▸▸▸',
    '▾▾▾▾▾▾◆◆◆◆◆◆',
    '▾▾▾▾▾▾◆◆◆◆◆◆',
    '▾▾▾▾▾▾◆◆◆◆◆◆',
    '▾▾▾▾▾▾◆◆◆◆◆◆'
  );

  let vertical;
  let horizontal; // stores the Jimp instances of the JGD images above.

  before(done => {
    const img1 = Jimp.read(verticalJGD);
    const img2 = Jimp.read(horizontalJGD);
    Promise.all([img1, img2])
      .then(images => {
        vertical = images[0];
        horizontal = images[1];
        done();
      })
      .catch(done);
  });

  const tests = {}; // Stores the expected result for each alignment combination.
  tests['LEFT TOP'] = {
    cover: {
      verti: mkJGD('▴▴▸▸', '▴▴▸▸', '▴▴▸▸', '▾▾◆◆'),
      horiz: mkJGD('▴▴▴▸', '▴▴▴▸', '▾▾▾◆', '▾▾▾◆')
    },
    contain: {
      verti: mkJGD('▴▴▸▸  ', '▴▴▸▸  ', '▴▴▸▸  ', '▾▾◆◆  ', '▾▾◆◆  ', '▾▾◆◆  '),
      horiz: mkJGD('▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆', '      ', '      ')
    }
  };
  tests['CENTER TOP'] = {
    cover: {
      verti: mkJGD('▴▴▸▸', '▴▴▸▸', '▴▴▸▸', '▾▾◆◆'),
      horiz: mkJGD('▴▴▸▸', '▴▴▸▸', '▾▾◆◆', '▾▾◆◆')
    },
    contain: {
      verti: mkJGD(' ▴▴▸▸ ', ' ▴▴▸▸ ', ' ▴▴▸▸ ', ' ▾▾◆◆ ', ' ▾▾◆◆ ', ' ▾▾◆◆ '),
      horiz: mkJGD('▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆', '      ', '      ')
    }
  };
  tests['RIGHT TOP'] = {
    cover: {
      verti: mkJGD('▴▴▸▸', '▴▴▸▸', '▴▴▸▸', '▾▾◆◆'),
      horiz: mkJGD('▴▸▸▸', '▴▸▸▸', '▾◆◆◆', '▾◆◆◆')
    },
    contain: {
      verti: mkJGD('  ▴▴▸▸', '  ▴▴▸▸', '  ▴▴▸▸', '  ▾▾◆◆', '  ▾▾◆◆', '  ▾▾◆◆'),
      horiz: mkJGD('▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆', '      ', '      ')
    }
  };

  tests['LEFT MIDDLE'] = {
    cover: {
      verti: mkJGD('▴▴▸▸', '▴▴▸▸', '▾▾◆◆', '▾▾◆◆'),
      horiz: mkJGD('▴▴▴▸', '▴▴▴▸', '▾▾▾◆', '▾▾▾◆')
    },
    contain: {
      verti: mkJGD('▴▴▸▸  ', '▴▴▸▸  ', '▴▴▸▸  ', '▾▾◆◆  ', '▾▾◆◆  ', '▾▾◆◆  '),
      horiz: mkJGD('      ', '▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆', '      ')
    }
  };
  tests['CENTER MIDDLE'] = {
    cover: {
      verti: mkJGD('▴▴▸▸', '▴▴▸▸', '▾▾◆◆', '▾▾◆◆'),
      horiz: mkJGD('▴▴▸▸', '▴▴▸▸', '▾▾◆◆', '▾▾◆◆')
    },
    contain: {
      verti: mkJGD(' ▴▴▸▸ ', ' ▴▴▸▸ ', ' ▴▴▸▸ ', ' ▾▾◆◆ ', ' ▾▾◆◆ ', ' ▾▾◆◆ '),
      horiz: mkJGD('      ', '▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆', '      ')
    }
  };
  tests['RIGHT MIDDLE'] = {
    cover: {
      verti: mkJGD('▴▴▸▸', '▴▴▸▸', '▾▾◆◆', '▾▾◆◆'),
      horiz: mkJGD('▴▸▸▸', '▴▸▸▸', '▾◆◆◆', '▾◆◆◆')
    },
    contain: {
      verti: mkJGD('  ▴▴▸▸', '  ▴▴▸▸', '  ▴▴▸▸', '  ▾▾◆◆', '  ▾▾◆◆', '  ▾▾◆◆'),
      horiz: mkJGD('      ', '▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆', '      ')
    }
  };

  tests['LEFT BOTTOM'] = {
    cover: {
      verti: mkJGD('▴▴▸▸', '▾▾◆◆', '▾▾◆◆', '▾▾◆◆'),
      horiz: mkJGD('▴▴▴▸', '▴▴▴▸', '▾▾▾◆', '▾▾▾◆')
    },
    contain: {
      verti: mkJGD('▴▴▸▸  ', '▴▴▸▸  ', '▴▴▸▸  ', '▾▾◆◆  ', '▾▾◆◆  ', '▾▾◆◆  '),
      horiz: mkJGD('      ', '      ', '▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆')
    }
  };
  tests['CENTER BOTTOM'] = {
    cover: {
      verti: mkJGD('▴▴▸▸', '▾▾◆◆', '▾▾◆◆', '▾▾◆◆'),
      horiz: mkJGD('▴▴▸▸', '▴▴▸▸', '▾▾◆◆', '▾▾◆◆')
    },
    contain: {
      verti: mkJGD(' ▴▴▸▸ ', ' ▴▴▸▸ ', ' ▴▴▸▸ ', ' ▾▾◆◆ ', ' ▾▾◆◆ ', ' ▾▾◆◆ '),
      horiz: mkJGD('      ', '      ', '▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆')
    }
  };
  tests['RIGHT BOTTOM'] = {
    cover: {
      verti: mkJGD('▴▴▸▸', '▾▾◆◆', '▾▾◆◆', '▾▾◆◆'),
      horiz: mkJGD('▴▸▸▸', '▴▸▸▸', '▾◆◆◆', '▾◆◆◆')
    },
    contain: {
      verti: mkJGD('  ▴▴▸▸', '  ▴▴▸▸', '  ▴▴▸▸', '  ▾▾◆◆', '  ▾▾◆◆', '  ▾▾◆◆'),
      horiz: mkJGD('      ', '      ', '▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆')
    }
  };

  function runAlignTest(align) {
    const jgdCoverV = tests[align].cover.verti;
    const jgdCoverH = tests[align].cover.horiz;
    const jgdContainV = tests[align].contain.verti;
    const jgdContainH = tests[align].contain.horiz;
    let a = align.split(' ');
    a = Jimp['HORIZONTAL_ALIGN_' + a[0]] | Jimp['VERTICAL_ALIGN_' + a[1]];
    it('cover aligned to ' + align, () => {
      vertical
        .clone()
        .cover(4, 4, a)
        .getJGDSync()
        .should.be.sameJGD(jgdCoverV, 'Vertical image');
      horizontal
        .clone()
        .cover(4, 4, a)
        .getJGDSync()
        .should.be.sameJGD(jgdCoverH, 'Horizontal image');
    });
    it('contain aligned to ' + align, () => {
      vertical
        .clone()
        .contain(6, 6, a)
        .getJGDSync()
        .should.be.sameJGD(jgdContainV, 'Vertical image');
      horizontal
        .clone()
        .contain(6, 6, a)
        .getJGDSync()
        .should.be.sameJGD(jgdContainH, 'Horizontal image');
    });
  }

  for (const align in tests) if (hasOwnProp(tests, align)) runAlignTest(align);
});
