import { Jimp as JimpType } from '@jimp/core';
import typeFn from '@jimp/types';
import pluginFn from '@jimp/plugins';

type Types = ReturnType<typeof typeFn>;
type Plugins = ReturnType<typeof pluginFn>;

declare const Jimp: JimpType<Types, Plugins>;
export default Jimp;
