<?php
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];

    $password = $_POST['password'];
    $username = $_POST['username'];

    $conn =new mysqli('localhost','root','','whack_a_mole','3308');
    if($conn->connect_error){
        die('Connection failed :'.$conn->connect_error);
    }
    else{
        $stmt = $conn->prepare("insert into signup(firstName,lastName,password,username)values(?,?,?,?)");
        $stmt->bind_param("ssss",$firstName,$lastName,$password,$username);
        $stmt->execute();
        echo "Registration successfull.....";
        $stmt ->close();
        $conn->close();
    }

?>