<?php
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    $conn =new mysqli('localhost','root','','whack_a_mole');
    if($conn->connect_error){
        die('Connection failed :'$conn->connect_error);
    }
    else{
        $stmt = $conn->prepare("insert into signup(firstName,lastName,username,password)values(?,?,?,?)");
        $stmt->bind_param("ssss",$firstName,$lastName,$username,$password);
        $stmt->execute();
        echo "Registration successfull.....";
        $stmt ->close();
        $conn->close();
    }

?>