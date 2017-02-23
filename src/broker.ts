//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';
//import { Promise } from 'promise';

/**
 * 
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

    /*-------------------------------------------------------------------
	 *				 		     BEHAVIORS
	 *-------------------------------------------------------------------*/
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