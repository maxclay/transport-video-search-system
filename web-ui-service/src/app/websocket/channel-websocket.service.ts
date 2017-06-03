import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { WebSocketService } from "./websocket.service";

// TODO review
@Injectable()
export class ChannelWebsocketService {

    private socketStarted: boolean;

    public observableData: Subject<Object> = new Subject();
    public identifier:Object = {};
    public identifierStr: string;
    public subscribed: Subject<boolean> = new Subject();

    constructor( private websocketService: WebSocketService ){

        this.observeOpened();
        this.observeMessage();

    }

    private static encodeIdentifier( identifier:string ):Object{

        return JSON.parse( identifier );

    }

    private static getDataString( parameters:Object ):string{

        let first = true,
            result = '';

        for ( let key in parameters ){

            if( first ){

                first = false;
                result +=  `\"${ key }\":\"${ parameters[ key ] }\"`;

            } else {

                result += `, \"${ key }\":\"${ parameters[ key ] }\"`;

            }

        }

        return `{ ${ result } }`;

    }

    private getSubscribeString():string{

        this.identifierStr = ChannelWebsocketService.getDataString( this.identifier );

        return JSON.stringify( {
            command: 'subscribe',
            identifier: this.identifierStr
        } );

    };

    private isThisChannel( data:Object ):boolean {

        if( data[ 'identifier' ] ){

            let identifier = ChannelWebsocketService.encodeIdentifier( data[ 'identifier' ] );

            if ( JSON.stringify( identifier ) === JSON.stringify( this.identifier ) ){

                return true;

            }

        }

        return false;

    }

    private observeMessage(){

        let self = this;

        this.websocketService.message.subscribe( ( data: Object ) => {

            // TODO review
            // if( self.isThisChannel( data ) ){

                // if( data[ 'type' ] && data[ 'type' ] == 'confirm_subscription' ){

                //     this.subscribed.next( true );

                // } else if ( data[ 'message' ] ){

                    this.observableData.next( data );

                // }

            // }

        } );

    }

    private observeOpened(){

        let self = this;

        this.websocketService.opened.subscribe( ( data: boolean ) => {

            self.socketStarted = data;

            if( data ){
                self.subscribe();
            }

        } );

    }
    
    private subscribe(){

        this.websocketService.sendMessage( this.getSubscribeString() );

    }
    

    public send( data: Object ){

        this.websocketService.sendMessage( JSON.stringify( {
            command:'message',
            identifier: this.identifierStr,
            data: ChannelWebsocketService.getDataString( data )
        } ) );

    }

    public unsubscribe(){

        this.websocketService.sendMessage( JSON.stringify( {
            command: 'unsubscribe',
            identifier: this.identifierStr } ) );
        this.subscribed.next( false );

    }

}