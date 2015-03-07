[ -e "PANEL_FIFO" ] && rm "$PANEL_FIFO"
mkfifo "$PANEL_FIFO"

bspc control --subscribe > "$PANEL_FIFO" &

xset -b &
xrdb -merge ~/.Xresources
mpd &
urxvtd &
feh --bg-scale ~/Downloads/wallpapers/4E6DPmK - Imgur.jpg &

## Initiate bspwm
sxhkd &
exec bspwm

