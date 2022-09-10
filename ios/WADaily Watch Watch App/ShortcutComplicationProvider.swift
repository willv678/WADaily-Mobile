//
//  ShortcutComplicationProvider.swift
//  WADaily WatchKit Extension
//
//  Created by Grant Andrews on 4/27/22.
//

import Foundation
import ClockKit
import SwiftUI

final class ShortcutComplicationProvider {
    func getShortcutComplication() -> CLKComplicationTemplate {
        return CLKComplicationTemplateGraphicCornerCircularView(ShortcutComplication())
    }
}
