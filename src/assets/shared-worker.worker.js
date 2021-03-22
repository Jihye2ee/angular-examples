connections = [];
self.onconnect = function(connectEvent) {
    console.log('[shared-worker.js]', connectEvent);
    const port = connectEvent.ports[0];
    
    port.start();
    connections.push(port);
    
    port.onmessage = function(messageEvent) {
        connections.forEach(connection => {
            let result = 0;

            /* for (let i = 1; i < 200; i++) {
                result += i;
            }
            */
            
            // messageEvent.data = heavyComputationsStatus;

            // postMessage(heavyComputationsStatus);
            // port.postMessage(messageEvent.data);
            connection.postMessage(messageEvent.data);
        });
    }
};