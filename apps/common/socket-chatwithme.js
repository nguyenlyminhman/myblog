module.exports = function (io) {
    let guestnames = [];
    io.sockets.on("connection", socket => {
        socket.on("addnewguest", guestname => {
            socket.guestname = guestname;
            guestnames.push(guestname);
            let data = {
                sender: "Mewo Admin",
                message: "Welcome to my chat Room."
            };
            socket.emit("update_smg", data);

            //Notify to all member in group.
            let data_bro = {
                sender: "Mewo Admin",
                message: guestname + " have join to Chat Room."
            };
            socket.broadcast.emit("update_smg", data_bro);
        });

        socket.on("send_smg", smg => {
            let data = {
                sender: "You",
                message: smg
            }
            socket.emit("update_smg", data);
            //Notify to all member in group
            let data_bro = {
                sender: socket.guestname,
                message: smg
            }
            socket.broadcast.emit("update_smg", data_bro)
        });

        socket.on("disconnect", smg => {
            for(let i = 0; i < guestnames.length; i++){
                if(guestnames[i]==socket.guestname){
                    guestnames.splice(i,1);
                }
            }
            let data_bro = {
                sender: "Mewo Admin",
                message: socket.guestname + " has left the group discussion."
            }
            socket.broadcast.emit("update_smg", data_bro)
        });

    });
}