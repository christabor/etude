from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from PIL import Image
from time import sleep
import os
import re


def make_preview(browser, url, delay=1):
    """Browse a site, move the mouse, delay a bit, then take a screenshot,
    and also generate a thumbnail as well."""
    actions = ActionChains(browser)
    if not url.startswith('http'):
        url = 'http://{}'.format(url)
    browser.get(url)
    filename = '{}.png'.format(url.replace('http://localhost:8000', ''))
    cwd = os.getcwd()
    path = '{}/screenshots/{}'.format(cwd, filename)
    # Wait, in case animations need to start up.
    sleep(delay)
    actions.move_by_offset(800, 600)
    actions.move_by_offset(400, 400)
    browser.save_screenshot(path)
    resize_and_crop(path, path.replace('.png', '_cropped.png'))


def valid_folder(name):
    """Match only valid projects, using only those
    with dates e.g. `01-01-2014`"""
    return re.match(r'[0-9]{2}-[0-9]{2}-[0-9]{4}', name)


def process_all_screenshots():
    """Process all folders, generating screenshots and thumbnails."""
    browser = webdriver.Firefox()
    cwd = os.getcwd()
    names = filter(valid_folder, os.listdir(cwd))
    for name in names:
        print('Getting screenshot for {}'.format(name))
        make_preview(browser, 'http://localhost:8000/{}'.format(name))
    browser.quit()


def resize_and_crop(img_path, modified_path, size=(400, 300), crop_type='top'):
    """
    ---------
    CREDITS: https://gist.github.com/sigilioso/2957026
    ---------

    Resize and crop an image to fit the specified size.
    args:
        img_path: path for the image to resize.
        modified_path: path to store the modified image.
        size: `(width, height)` tuple.
        crop_type: can be 'top', 'middle' or 'bottom', depending on this
            value, the image will cropped getting the 'top/left', 'midle' or
            'bottom/rigth' of the image to fit the size.
    raises:
        Exception: if can not open the file in img_path of there is problems
            to save the image.
        ValueError: if an invalid `crop_type` is provided.
    """
    # If height is higher we resize vertically, if not we resize horizontally
    img = Image.open(img_path)
    # Get current and desired ratio for the images
    img_ratio = img.size[0] / float(img.size[1])
    ratio = size[0] / float(size[1])
    # The image is scaled/cropped vertically or
    # horizontally depending on the ratio
    if ratio > img_ratio:
        img = img.resize((
            size[0], size[0] * img.size[1] / img.size[0]), Image.ANTIALIAS)
        # Crop in the top, middle or bottom
        if crop_type == 'top':
            box = (0, 0, img.size[0], size[1])
        elif crop_type == 'middle':
            box = (0, (img.size[1] - size[1]) / 2, img.size[0], (
                img.size[1] + size[1]) / 2)
        elif crop_type == 'bottom':
            box = (0, img.size[1] - size[1], img.size[0], img.size[1])
        else:
            raise ValueError('ERROR: invalid value for `crop_type`')
        img = img.crop(box)
    elif ratio < img_ratio:
        img = img.resize((size[1] * img.size[0] /
                         img.size[1], size[1]), Image.ANTIALIAS)
        # Crop in the top, middle or bottom
        if crop_type == 'top':
            box = (0, 0, size[0], img.size[1])
        elif crop_type == 'middle':
            box = ((img.size[0] - size[0]) / 2, 0, (
                   img.size[0] + size[0]) / 2, img.size[1])
        elif crop_type == 'bottom':
            box = (img.size[0] - size[0], 0, img.size[0], img.size[1])
        else:
            raise ValueError('ERROR: invalid value for `crop_type`')
        img = img.crop(box)
    else:
        # If the scale is the same, we do not need to crop
        img = img.resize((size[0], size[1]), Image.ANTIALIAS)
    img.save(modified_path)


if __name__ == '__main__':
    process_all_screenshots()
