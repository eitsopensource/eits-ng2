/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TranslateResolverService } from './translate-resolver.service';
import { Routes } from '@angular/router';

export { Broker } from './broker';
export { TranslatePipe } from './translate.pipe';
export { TranslateResolverService, BUNDLE_PATH } from './translate-resolver.service';
export { translate } from './translate.service';

export function withBundle(routes: Routes): Routes {
    return routes.map(route => Object.assign({ resolve: { bundle: TranslateResolverService } }, route));
}