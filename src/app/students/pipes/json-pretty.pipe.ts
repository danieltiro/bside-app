// geek.pipe.ts 
import { Pipe, PipeTransform } from '@angular/core'; 
  
@Pipe({ 
    name: 'pretty'
}) 
  
export class JsonPrettyPipe implements PipeTransform { 
  
    transform(val: any) { 
        return JSON.stringify(val, undefined, 4) 
            .replace(/ /g, ' ') 
            .replace(/\n/g, '<br/>'); 
    } 
}