# Importing libraries that we'll be using
import pygame
import sys
import random

# Initializing pygame
pygame.init()

# These set us up to be able to use text and timers later
font = pygame.font.SysFont(None, 36)

# Defining the window we will display our game on (in terms of pixels)
SCREEN_WIDTH = 700
SCREEN_HEIGHT = 500
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("You aren't your own enemy")

#GLOBAL VARIABLES
#We can use pygame.Rect to make a invisible rectangular object 
#to detect things like collisions
#It follows the format: pygame.Rect(<topleft_x>,<topleft_y>,<width>,<height>)
floor = pygame.Rect(0, SCREEN_HEIGHT - 50, SCREEN_WIDTH, 50)

char_x = int(SCREEN_WIDTH / 2)
char_y = SCREEN_HEIGHT - 100
char_size = 50

#This will be our player's goal
goal_x, goal_y = int(SCREEN_WIDTH / 2), 50
goal = pygame.Rect(goal_x,goal_y, 50, 50)

#Some RGB values we might want to use
DARK_GREEN = (0, 150, 0)
SKY_BLUE = (105, 186, 255)
WHITE = (255,255,255)

def draw_setting():
	"""Draws background, platforms, floor, and goal onto our screen"""
	# For each new frame, we want to redraw our background over the previous frame
	pygame.draw.rect(screen, SKY_BLUE, (0, 0, SCREEN_WIDTH, SCREEN_HEIGHT))

	# Drawing the floor
	pygame.draw.rect(screen, DARK_GREEN, floor)
	
	# Drawing score
	score_txt = font.render(f"Goal Score: {score}", True, (255,255,255))
	screen.blit(score_txt, (10, 10))

def update_char():
	"""Control monkey's movement and image, and detect collisions with platforms and banana"""
	#Globals allow us to edit variable that exist outside of this function
	global char_x, char_y, char_y, char, char_img, platform_list,score

	#Constantly applying gravity to monkey
	velocity_y += char_y

	#Here's how you detect keystrokes:
	key_pressed = pygame.key.get_pressed()
	if key_pressed[pygame.K_a]:
		char_x -= 5
	elif key_pressed[pygame.K_d]:
		char_x += 5
	#Update monkey's x and y coordinates
	char = pygame.Rect(char_x, char_y, char_size, char_size)

	#Check if monkey is on a platform
	for platform in platform_list:
		if char.colliderect(platform) and velocity_y > 0:
			char_y = platform[1] - char_size #platform[1] stores the platform's y coordinate
			velocity_y = 0
			if key_pressed[pygame.K_SPACE]: #Monkey can only jump when standing on something
				velocity_y = jump_power
	if char.colliderect(floor):
		char_y = floor[1] - char_size
		velocity_y = 0
		if key_pressed[pygame.K_SPACE]:
			velocity_y = jump_power
		#Generate new platforms every time the ground is touched (won't generate if there are enough platforms)
		

	#Animate the monkey
	sprite_frame = int((frame / 5) % 4) + 1
	if len(platform_list) == num_platforms:  # Whenever platforms are all generated, play the animation
		if sprite_frame == 1:
			current_sprite = f"hungry_monkey_sprites/2monkey_f1.png"
		elif sprite_frame == 2:
			current_sprite = f"hungry_monkey_sprites/0monkey_f2.png"
		elif sprite_frame == 3:
			current_sprite = f"hungry_monkey_sprites/3monkey_f3.png"
		else:
			current_sprite = f"hungry_monkey_sprites/4monkey_f4.png"
		char_img = pygame.image.load(current_sprite)
	if velocity_y < 0 and len(platform_list) == num_platforms: #Jumping sprite
		char_img = pygame.image.load(f"hungry_monkey_sprites/6monkey_jump_sprite.png")
	# Detect banana collision
	if char.colliderect(goal) and len(platform_list) == num_platforms:
		platform_list = []
		monkey_img = pygame.image.load(f"hungry_monkey_sprites/5monkey_happy.png")
		score += 1

	#Draw monkey onto screen
	screen.blit(char_img, (char_x, char_y))

def game_over_display():
	"""Displays game stats whenever time runs out"""
	global score

	screen.fill(SKY_BLUE)
	game_over_txt = font.render("Game Over", True, WHITE)
	score_txt = font.render(f"Your score was: {score}", True, WHITE)
	top_score_txt = font.render(f"The high score is: {top_score}",True,WHITE)
	restart_txt = font.render("Press R to restart, or Q to quit",True, WHITE)

	#Draw the above text onto the screen
	screen.blit(game_over_txt, (SCREEN_WIDTH // 2 - game_over_txt.get_width() // 2, SCREEN_HEIGHT // 2 - 100))
	screen.blit(score_txt, (SCREEN_WIDTH // 2 - score_txt.get_width() // 2, SCREEN_HEIGHT // 2 - 50))
	screen.blit(top_score_txt, (SCREEN_WIDTH // 2 - top_score_txt.get_width() // 2, SCREEN_HEIGHT // 2))
	screen.blit(restart_txt, (SCREEN_WIDTH // 2 - restart_txt.get_width() // 2, SCREEN_HEIGHT // 2 + 50))
	pygame.display.update()

	# Wait for restart or quit input
	input_waiting = True
	while input_waiting:
		for event in pygame.event.get():
			if event.type == pygame.QUIT:
				pygame.quit()
				sys.exit()
			if event.type == pygame.KEYDOWN:
				if event.key == pygame.K_r: # Press R to restart
					input_waiting = False
					game_loop() # Restart the game
				elif event.key == pygame.K_q: # Press Q to quit
					pygame.quit()
					sys.exit()

def advance_timer():
	"""Every frame, reduce the time left for the game and display this change"""
	global top_score, frames_left

	frames_left -= 1
	timer_txt = font.render(f"Time left: {frames_left}", True, (255, 255, 255))
	screen.blit(timer_txt, (10, 60))

	#Check if the timer has run out, meaning the game is over
	if frames_left <= 0:
		if score > top_score:
			top_score = score
		game_over_display()


def reset_variables():
	"""Every time the game_loop is rerun, reset relevant variables"""
	global frames_left, score, platform_list, monkey_x, monkey_y

	frames_left = 1000
	score = 0
	platform_list = []
	char_x = int(SCREEN_WIDTH / 2)
	char_y = SCREEN_HEIGHT - 100

def game_loop():
	"""This function runs our main game loop, yippie!"""
	global frame
  
	reset_variables()
	running = True
	while running:
		#Here is an instance of event handling, checking if the user wants to exit
		for event in pygame.event.get():
			if event.type == pygame.QUIT:
				running = False
				pygame.quit()
				sys.exit()

		draw_setting() #Drawing floor, platforms, and banana
		update_char() #Let's allow our monkey to move and collide with things
		advance_timer() #Progress the game timer and check if it's run out

		# Now that we've made our changes to the frame, let's update the screen to reflect those changes:
		pygame.display.update()
		frame += 1 #We use this frame variable to animate our monkey

game_loop()