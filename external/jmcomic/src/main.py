# from jmcomic import JmOption
import jmcomic
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

number = sys.argv[1]
option = jmcomic.create_option_by_file('external\jmcomic\src\option.yml')
option.download_album(number)