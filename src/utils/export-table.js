import XLSX from 'xlsx';

/**
 * @description 生成文件名
 */
function generateId(prefix) {
  const d = Date.now().toString(16);
  return prefix ? `${prefix}_${d}` : d;
}

/**
 * @description 字符串转字符流
 */
function str2ab(s) {
  let buf = new ArrayBuffer(s.length);
  let view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
}

/**
 * @description 将指定的自然数转换为26进制表示,映射关系:[0-25] -> [A-Z]
 */
function getCharCol(n) {
  let s = '';
  let m = 0;
  while (n > 0) {
    m = (n % 26) + 1;
    s = String.fromCharCode(m + 64) + s;
    n = (n - m) / 26;
  }
  return s;
}

/**
 * @description 导出xlsx格式文件
 * @param {Object} th [表头]
 * @param {Array} tb [表体]
 * @param {String} filename [文件名]
 * @param {String} type [文件类型]
 */
export function downloadXLSX({ th, tb, filename, type }) {
  // if (!isObject(th) || !isArray(tb)) return;
  const _keys = Object.keys(th || tb[0]);
  const _th = th || _keys.reduce((p, n) => Object.assign(p, { [n]: n }));
  const columns = [_th, ...tb];

  let tmpdata = {};

  columns
    .map((v, i) =>
      _keys.map((k, j) => ({
        value: v[k],
        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
      }))
    )
    .reduce((prev, next) => Array.prototype.concat.call(prev, next))
    .forEach(el => {
      tmpdata[el.position] = { v: el.value };
    });

  const outputPos = Object.keys(tmpdata); // 设置区域,比如表格从 A1 到 D10
  const tmpWB = {
    SheetNames: ['Sheet1'],
    Sheets: {
      Sheet1: Object.assign({}, tmpdata, {
        '!ref': `${outputPos[0]}:${outputPos[outputPos.length - 1]}`
      })
    }
  };
  const tmpDown = new Blob(
    [
      str2ab(
        XLSX.write(tmpWB, {
          bookType: type || 'xlsx',
          bookSST: false,
          type: 'binary'
        })
      )
    ],
    {
      type: ''
    }
  ); // 创建二进制对象写入转换好的字节流
  const href = URL.createObjectURL(tmpDown);
  const _filename = (filename && filename.trim()) || generateId('excel');
  let target = document.createElement('a');
  target.download = _filename + '.xlsx';
  target.href = href;
  target.click();
  setTimeout(() => URL.revokeObjectURL(tmpDown), 100);
}

/**
 * @description 导出csv格式文件
 * @param {Object} th [表头]
 * @param {Array} tb [表体]
 * @param {String} filename [文件名]
 * @returns
 */
export function downloadCSV({ th, tb, filename }) {
  // if (!isObject(th) || !isArray(tb)) return;
  const _keys = Object.keys(th || tb[0]);
  const _th = th || _keys.reduce((p, n) => Object.assign(p, { [n]: n }));
  const columns = [_th, ...tb];
  const tmpdata = columns.map(v => _keys.map(k => v[k]));

  const BOM = '\uFEFF';
  const csvStr = BOM + tmpdata.map(el => el.join()).join('\n');
  const _filename = (filename && filename.trim()) || generateId('csv');

  let target = document.createElement('a');
  target.download = `${_filename}.csv`;
  target.href = `data:attachment/csv,${encodeURI(csvStr)}`;
  target.click();
  setTimeout(() => URL.revokeObjectURL(csvStr), 100);
}

// const th = {
//   name: '菜名',
//   size: '规格',
//   taste: '味道',
//   price: '价格',
//   remain: '余量'
// };

// const tb = [
//   {
//     name: '红烧鱼',
//     size: '大',
//     taste: '微辣',
//     price: '40',
//     remain: '100'
//   },
//   {
//     name: '麻辣小龙虾',
//     size: '大',
//     taste: '麻辣',
//     price: '138',
//     remain: '200'
//   }
// ];

// downloadXLSX({ th, tb });
// downloadCSV({ th, tb });
