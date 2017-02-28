//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';
//import { Promise } from 'promise';

/**
 * //FIXME The service import dinamically not work beacuse of async call. Must wait for await e async methods. 
 */
export class Broker
{
    /*-------------------------------------------------------------------
	 *				 		     ATTRIBUTES
	 *-------------------------------------------------------------------*/
    /**
     * 
     */
    private static services:Array<any> = new Array();
    
//    /**
//     * 
//     */
//    private static BROKER_URL:string = "/broker";

    /*-------------------------------------------------------------------
	 *				 		     BEHAVIORS
	 *-------------------------------------------------------------------*/
//    /**
//     * 
//     */
//    public static configure( serverUrl:string ):Broker
//    {
//        Broker.BROKER_URL = serverUrl;
//        
//        Broker.importScript( Broker.BROKER_URL+"/engine.js" )
//            .catch( (e) => console.error(e) );
//        
//        return Broker;
//    }
    
     /**
      * 
      */
     public static of( serviceName:string ):ServiceProxy 
     {
         //is it already cached?
         if ( !Broker.services[serviceName] )
         {
             Broker.services[serviceName] = new ServiceProxy( serviceName );
         }
         
         return Broker.services[serviceName];
     }

//     /**
//      * 
//      */
//     private static importScript( url:string ):Promise<HTMLScriptElement>
//     {
//         return new Promise<HTMLScriptElement>( (resolve, reject) => {
//             const script = document.createElement("script");
//             script.type = "text/javascript";
//             script.src = url;
//             script.onload = function() {
//                 resolve( script );
//             };
//             script.onerror = function(event) {
//                 reject( event );
//             };
//
//             document.head.appendChild(script);
//         });
//     }
//     
//     /**
//      * 
//      */
//     public static importService( serviceName:string ):Promise<HTMLScriptElement>
//     {
//         return Broker.importScript( Broker.BROKER_URL+"/interface/"+serviceName+".js" );
//     }
}

/**
 * 
 */
class ServiceProxy
{
    /*-------------------------------------------------------------------
     *                           ATTRIBUTES
     *-------------------------------------------------------------------*/
    /**
     * 
     */
    private serviceName:string;

    /**
     * 
     */
    private service:any;

    /*-------------------------------------------------------------------
     *                           CONSTRUCTOR
     *-------------------------------------------------------------------*/
    /**
     * 
     */
    public constructor( serviceName: string ) 
    {
        this.serviceName = serviceName;
        this.service = window[serviceName];
        
        if ( !this.service ) throw new Error("The service.js must be imported before use the broker in the main html.");
    }
    
    /*-------------------------------------------------------------------
     *                           BEHAVIORS
     *-------------------------------------------------------------------*/
    /**
     * 
     */
    public promise( methodName:string, ...args ):Promise<any> 
    {
        if ( !this.service[methodName] ) throw new Error("The method '"+methodName+"' not exists in the service '"+this.serviceName+"'");
        
        const promise = new Promise<any>( (resolve, reject) => {
        
            const callback = {
                callback:( result ) => {
                    resolve( result );
                },
                errorHandler:( message ) => {
                    reject( new Error(message) );
                }
            };
            
            args.push(callback);
            this.service[methodName].apply(this, args);
        });
        
        return promise;
    }
}