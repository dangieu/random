<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
    <title>Document</title>
</head>
<body>
    <button style="color: white" onclick="gameOver()">GAMEOVER</button>
    <div class="cube">
        <?php 
        for($layer = 0; $layer < 3; $layer++) {
            echo '<div id='."layer$layer".' class="layer">';
            for($row = 0; $row < 3; $row++) {
                for($col = 0; $col < 3; $col++) {
                    echo '<div id='."f$layer$row$col".' class="block" onclick="cubeInteraction(this)">' . "f$layer$row$col" ;
                    echo '<div class="bottom side"></div>
                        <div class="top side"></div>
                        <div class="front side"></div>
                        <div class="back side"></div>
                        <div class="left side"></div>
                        <div class="right side"></div>';
                    echo '</div>';
                }
            }
            echo '</div>';
        }
        ?>
    </div>
    
</body>
</html>