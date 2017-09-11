# Translate

## Como Configurar

* No arquivo `routing.module.ts`, adicione os seguintes imports:

```typescript
import { BUNDLE_PATH, TranslateResolverService, withBundle } from 'eits-ng2/src';
```

* Na definição das rotas, envolva o array de rotas com `withBundle()`:

Antes:
```typescript
const routes: Routes = [
    ...
];
```

Depois:
```typescript
const routes: Routes = withBundle([
    ...
]);
```

* Na definição do `RoutingModule`, na anotação `@NgModule`, adicione a chave `providers` conforme o exemplo:
```typescript
@NgModule({
  imports: [routing],
  declarations: [],
  providers: [
    TranslateResolverService,
    { provide: BUNDLE_PATH, useValue: '/<microserviço>/bundles' }
  ],
  exports: [RouterModule]
})
export class RoutingModule {

}
```

* No arquivo do módulo, `module.ts`, adicione o seguinte import:
```typescript
import { TranslatePipe } from 'eits-ng2';
```
* Remova a configuração do ngx-translate, a sua linha na chave `imports`, e os `imports` no início do arquivo.
* Na chave `declarations`, adicione `TranslatePipe`.

### Nos Componentes

* Remova as declarações de `private TranslateService` nos construtores.


## Uso

* No HTML: utilize o pipe `translate`. Na maioria dos casos não será necessário alterar o HTML.
* Nos componentes:
    * Adicione o import do helper de tradução: `import { translate } from 'eits-ng2';`
    * Utilize a tradução chamando a função: `translate(key)`
