# from jmcomic import JmOption
import jmcomic
import sys

number = sys.argv[1]
option = jmcomic.create_option_by_file('external\jmcomic\src\option.yml')
option.download_album(number)