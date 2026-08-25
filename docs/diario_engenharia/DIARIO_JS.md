Frontend
📅 Linha do Tempo & Marcos
Marco: Inicialização do registro de estudos e códigos em JavaScript no monorepo Opus-Magnum.

EOF

### criar itens
* item principal
* item principal
  - subitem
  - subitem

## CODE JAVASCRIPT
### Bubble sort em js

```bash
function buble(arr){
    let tamanho=arr.length;
    for(let i=0; i<tamanho; i++){
        for(let k=0; k<tamanho -1; k++){
            if(arr[k]>arr[k+1]){
                let gurdar_maior=arr[k+1];
                arr[k]=arr[k+1];
                arr[k+1]=guardar_maior;
            }
        }   
    }
    return arr;
}
```