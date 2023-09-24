document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')
    var gameOvertxt = document.getElementById("gameOverTxt").style.display = "none"     
    

    let birdLeft = 220
    let birdBottom = 90
    let gravity = 3  
    let isGameOver = false
    let gap = 430 

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let GameTimerId = setInterval(startGame, 40)

    function control(e) {
        if (e.keyCode === 32){
            jump()
        }
    }

    function jump(){
        if(birdBottom < 490) birdBottom += 40
        bird.style.bottom = birdBottom + 'px'

    }
    document.addEventListener('keyup', control)

    function generateObstacle(){
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        } 
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle(){
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60){
                clearInterval(TimerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && 
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -198) || 
                birdBottom === 0
                ) {
                gameOver()
                clearInterval(TimerId)
            }
        }
        let TimerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 2000)
    }
    generateObstacle()

    function gameOver(){
        clearInterval(GameTimerId)
        isGameOver = true        
        document.removeEventListener('keyup', control)   
        var gameOvertxt = document.getElementById("gameOverTxt").style.display = "block";
        

    }
    
})